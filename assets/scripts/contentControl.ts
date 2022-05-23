const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {
    @property(cc.Prefab)
    pre: cc.Prefab = null
    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        for(let page of this.node.children) {
            for(let i=0;i<48;i++) {
                let item = cc.instantiate(this.pre)
                page.children[0].addChild(item)
            }
            console.log(page);
            
        }
    }

    start () {
        
    }

    // update (dt) {}
}
