import Component from 'vue-class-component';
import * as Vue from 'vue-tsx-support';
import { Prop } from 'vue-property-decorator';


export interface InputProps   {
    placeholder: String
}

@Component
export default class Input extends Vue.Component<InputProps,any> {
    [x: string]: any;
    text: any;
    input(e) {
        this.text = e.target.value
        this.$emit('input', e.target.value);
    }
    @Prop([String, Boolean]) value: string | boolean | undefined;

    data() {
      return {
        text: ''
      }
    }
        
    render() {
        return <input value={this.value} onInput={this.input}/>   
    }
}