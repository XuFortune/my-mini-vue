import { computed } from "./reactive/computed";
import { effect } from "./reactive/effect";
import { reactive } from "./reactive/reactive";
import { ref } from "./reactive/ref";

const num = ( window.num = ref(0));

const c = (window.c=computed({
    get(){
        console.log('get');
        return num.value *2
    },
    set(newVal){
        num.value = newVal
    }
}))
