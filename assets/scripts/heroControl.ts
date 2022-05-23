const {ccclass, property} = cc._decorator;

// 保存输入和人物状态
const Input = {
}
const State = {
    // 站立状态
    stand: 1,
    // 攻击状态
    attack: 2,

}

@ccclass
export default class NewClass extends cc.Component {

    // 最大速度
    MAX_SPEED: number = 150;
    // 初始速度
    speed = cc.v2(0,0);
    // 角色默认状态
    heroState = State.stand;
    // 角色默认动画
    defaultAnimation = 'idel';
    // 获取当前角色动画
    heroAnimation: cc.Animation = null;
    // 攻击次数
    combo: number = 0;
    // 刚体
    rbody: cc.RigidBody = null;
    start() {
        
    }
    onLoad () {
        //自定义方法
        cc.systemEvent.on('keydown',this.onkeydown,this);
        cc.systemEvent.on('keyup',this.onkeyup,this);
        this.heroAnimation = this.node.getComponent(cc.Animation);
        this.heroAnimation.on('finished',this.onAnimationFinished,this);
        this.rbody = this.node.getComponent(cc.RigidBody);
    }
    
    onDestroy () {
        // 解绑
        this.heroAnimation.off('finished',this.onAnimationFinished,this);
        cc.systemEvent.off('keydown',this.onkeydown,this);
        cc.systemEvent.off('keyup',this.onkeyup,this);
    }

    update (dt) {
        // 状态切换
        switch(this.heroState) {
            // 如果在stand状态下按住j键,则修改角色状态为攻击状态
            case State.stand: {
                if(Input[cc.macro.KEY.j]) {
                    this.heroState = State.attack;
                }
                break;
            }
        }
        // 攻击状态 
        // 判断角色状态,角色状态与攻击状态相同时，如果按住j键则调用 攻击方法
        if(this.heroState == State.attack) {
            this.attack();
        } else if(this.heroState == State.stand) {
            this.move();
        }
    }

    //方法区 
    // 键盘按下时调用
    onkeydown(e) {
        Input[e.keyCode] = 1;
        
    }

    // 键盘松开时调用
    onkeyup(e) {
        Input[e.keyCode] = 0;
    }
    // 动画结束后调用 用于连击判断
    onAnimationFinished(e,data) {
        // e是事件类型
        // data是事件对象 ->这里是返回整个动画组件
        console.log(data.name);
        if(data.name == 'attack1' || data.name == 'attack2' || data.name == 'attack3') {
            // 如果条件为true,combo进行取模循环
            this.combo = (this.combo + 1) % 3;
            this.heroState = State.stand;
            setTimeout(() => {
                if(this.heroState == State.attack) {
                    return;
                }
                this.combo = 0;
            }, 500);
        }
    }

    // 设置动画
    setAnamaition(animation) {
        if(this.defaultAnimation == animation) {
            return;
        }else {
            this.defaultAnimation = animation;
            this.heroAnimation.play(this.defaultAnimation);
        }
    }
    // 攻击方法
    attack() {
        let lv = this.rbody.linearVelocity;
        if(Input[cc.macro.KEY.j]) {
            // 攻击连击动作
            console.log(this.combo);
            if(this.combo == 0 ) {
                this.setAnamaition('attack1');
            }else if(this.combo == 1) {
                this.setAnamaition('attack2');
            }else if (this.combo == 2){
                this.setAnamaition('attack3');
            }
            lv.x = 0
        }
        this.rbody.linearVelocity = lv;
    }
    // 移动方法
    move() {
        let lv = this.rbody.linearVelocity;
        // 获取当前节点的缩放比例的绝对值
        let scale = Math.abs(this.node.scaleX);
        // 如果Input中存在的ASCII码值与cc.macro的KEY相同，就让当前节点的方向发生改变
        if(Input[cc.macro.KEY.a] || Input[cc.macro.KEY.left]) {
            this.speed.x = -1;
            // 让当前节点镜像翻转
            this.node.scaleX = -scale;
            // 当节点移动时,设置他的动画为run
            this.setAnamaition('run');
        }else if(Input[cc.macro.KEY.d] || Input[cc.macro.KEY.right]){
            this.speed.x = 1
            // 让当前节点镜像翻转
            this.node.scaleX = scale;
            this.setAnamaition('run');
        }else {
            this.speed.x = 0
            this.setAnamaition('idel');
        }
        
         // speed为1时，角色向左移动，speed为0时，角色向右移动
         if(this.speed) {
            lv.x = this.speed.x * this.MAX_SPEED;
        }else {
            lv.x = 0;
        }
        // 赋值当前方向的线性速度(移动)
        this.rbody.linearVelocity = lv;
    }

}
