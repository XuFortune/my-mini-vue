const { effect } = require("./reactive/effect");
const { reactive } = require("./reactive/reactive");

const obseverd = (window.obseverd = reactive({
    count:0
}))
effect(()=>{
    console.log('observed.count is',obseverd.count);
})