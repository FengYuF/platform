const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    ENEMY_HP = 5;
    isHit = false;
    animation:cc.Animation = null

    onLoad () {
        this.animation = this.node.getComponent(cc.Animation)


    }

    // 碰撞检测回调
    onCollisionEnter(other,self) {
        // 发生碰撞时,敌人血量减少,怪物血量归零时,敌人死亡(销毁)
        if(other.node.group == 'hero') {
            this.isHit = true;
            if(this.isHit) {
                this.animation.play('hit')
                this.isHit = false;
                this.ENEMY_HP--;
            }
            if(this.ENEMY_HP == 0){
                this.node.destroy()
            }
        }
    }
}
