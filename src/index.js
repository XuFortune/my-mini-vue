import {h,render,Text,Fragment} from "./runtime/index"


render(
    h(
        'ul',null,[
            h('li',null,'first'),
            h(Fragment,null,[
                h('li',null,'middle'),
            ]),
            h('li',null,'last')
        ]
    ),
    document.body
)