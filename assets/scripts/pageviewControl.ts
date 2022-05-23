const {ccclass, property} = cc._decorator;

const Input = {
}

@ccclass
export default class NewClass extends cc.Component {


    onLoad () {
        cc.systemEvent.on(cc.Node.EventType.MOUSE_ENTER,()=>{
            console.log('111');
            
            console.log(this.node.children);
            
        })
    }

    start () {

    }

    // update (dt) {}
}
