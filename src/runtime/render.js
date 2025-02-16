import { ShapeFlags } from "./vnode";
import { patchProps, patchDomProp } from "./patchProps";

export function render(vnode, container) {
    const prevVNode = container._vnode
    if (!vnode) {
        if (prevVNode) {
            unmount(prevVNode);
        }
    } else {
        patch(prevVNode, vnode, container)
    }
    container._vnode = vnode
}
function mountElement(vnode, container, anchor) {
    const { type, props, children, shapeFlag } = vnode
    const el = document.createElement(type)
    patchProps(null, props, el)
    if (shapeFlag & ShapeFlags.TEXT_CHILDREN) {
        mountTextNode(vnode, el)
    } else if (shapeFlag & ShapeFlags.ARRAY_CHILDREN) {
        mountChildren(children, el)
    }
    container.insertBefore(el, anchor)
    vnode.el = el
}
function unmount(vnode) {
    const { shapeFlag, el } = vnode;
    if (shapeFlag & ShapeFlags.COMPONENT) {
        unmountComponent(vnode);
    } else if (shapeFlag & ShapeFlags.FRAGMENT) {
        unmountFragment(vnode)
    } else {
        el.parentNode.removeChild(el)
    }
}


function unmountFragment(vnode) {
    let {el:cur,anchor:end} = vnode
    const parentNode = cur.parentNode
    while (cur !== end){
        let next = cur.nextSibling
        parentNode.removeChild(cur)
        cur = next
    }
    parentNode.removeChild(end)
}


function mountTextNode(vnode, container,anchor) {
    const textNode = document.createTextNode(vnode.children)
    // container.appendChild(textNode)
    container.insertBefore(textNode, anchor)
    vnode.el = textNode
}
function mountChildren(vnode, container, anchor) {
    vnode.forEach(child => {
        patch(null, child, container, anchor)
    });

}
function processElement(prevVNode, vnode, container, anchor) {
    if (prevVNode) {
        patchElement(prevVNode, vnode)
    } else {
        mountElement(vnode, container, anchor)
    }
}
function processText(prevVNode, vnode, container) {
    if (prevVNode) {
        vnode.el = prevVNode.el
        prevVNode.el.textContent = vnode.children
    } else {
        mountTextNode(prevVNode, container)
    }
}
function processFragment(prevVNode, vnode, container,anchor) {
    const fragmentStartAnchor = vnode.el = prevVNode ? prevVNode.el : document.createTextNode('')
    const fragmentEndAnchor = vnode.anchor = prevVNode ? prevVNode.anchor : document.createTextNode('')
    if (prevVNode) {
        patchChildren(prevVNode, vnode, container,fragmentEndAnchor)
    } else {
        // container.appendChild(fragmentStartAnchor)
        // container.appendChild(fragmentEndAnchor)
        container.insertBefore(fragmentStartAnchor,anchor)
        container.insertBefore(fragmentEndAnchor,anchor)
        mountChildren(vnode.children, container, fragmentEndAnchor)
    }
}
function processComponent(prevVNode, vnode, container) {

}
function unmountComponent(prevVNode, vnode, container) {

}
function isSameVNode(prevVNode, vnode) {
    return prevVNode.type === vnode.type
}
function patch(prevVNode, vnode, container, anchor) {
    if (prevVNode && !isSameVNode(prevVNode, vnode)) {
        anchor = (prevVNode.anchor||prevVNode.el).nextSibling
        unmount(prevVNode)
        prevVNode = null
    }
    const { shapeFlag } = vnode
    if (shapeFlag & ShapeFlags.COMPONENT) {
        processComponent(prevVNode, vnode, container)
    } else if (shapeFlag & ShapeFlags.TEXT) {
        processText(prevVNode, vnode, container)
    } else if (shapeFlag & ShapeFlags.FRAGMENT) {
        processFragment(prevVNode, vnode, container,anchor)
    } else {
        processElement(prevVNode, vnode, container, anchor)
    }
}

function patchElement(prevVNode, vnode) {
    vnode.el = prevVNode.el;
    patchProps(prevVNode.props, vnode.props, vnode.el);
    patchChildren(prevVNode, vnode, vnode.el)
}
function unmountChildren(children) {
    children.forEach((child) => {
        unmount(child)
    })
}
function patchChildren(prevVNode, vnode, container,anchor) {
    const { shapeFlag: prevShapeFlag, children: prevChildren } = prevVNode
    const { shapeFlag, children } = vnode
    if (shapeFlag & ShapeFlags.TEXT_CHILDREN) {
        if (prevShapeFlag & ShapeFlags.ARRAY_CHILDREN) {
            unmountChildren(prevChildren)
        }
        if (prevChildren !== children) {
            container.textContent = children
        }

    } else if (shapeFlag & ShapeFlags.ARRAY_CHILDREN) {
        if (prevShapeFlag & ShapeFlags.TEXT_CHILDREN) {
            container.textContent = ''
            mountChildren(children, container,anchor)
        } else if (prevShapeFlag & ShapeFlags.ARRAY_CHILDREN) {
            patchArrayChildren(prevChildren, children, container,anchor)
        } else {
            mountChildren(children, container,anchor)
        }
    } else {
        if (prevShapeFlag & ShapeFlags.TEXT_CHILDREN) {
            container.textContent = ''
        } else if (prevShapeFlagshapeFlag & ShapeFlags.ARRAY_CHILDREN) {
            unmountChildren(prevChildren)
        }
    }

}
function patchArrayChildren(prevChildren, children, container,anchor) {
    const oldLength = prevChildren.length
    const newLength = children.length
    const commonLength = Math.min(oldLength, newLength)
    for (let i = 0; i < commonLength; i++) {
        patch(prevChildren[i], children[i], container,anchor)
    }
    if (oldLength > newLength) {
        unmountChildren(prevChildren.slice(commonLength))
    } else if (oldLength < newLength) {
        mountChildren(children.slice(commonLength), container,anchor)
    }
}