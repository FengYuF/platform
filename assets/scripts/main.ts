const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {
    // LIFE-CYCLE CALLBACKS:
    @property(cc.PageView)
    pageView: cc.PageView = null

    state: number = 0
    onLoad () {
        cc.director.getPhysicsManager().enabled = true
        cc.director.getCollisionManager().enabled = true
        cc.director.getCollisionManager().enabledDebugDraw = true

    }

    start () {

    }

    update (dt) {
        if(this.state == 0) {
            cc.systemEvent.on('keydown',(e)=>{
                if(e.keyCode == 9) {
                    this.pageView.node.active = true
                }
                this.state = 1
                
            })
        }else {
            cc.systemEvent.on('keydown',(e)=>{
                if(e.keyCode == 9) {
                    this.pageView.node.active = false
                }
                this.state = 0
            })
        }
    }
}
