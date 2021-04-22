export default {
    data() {
        return {
            timeOutMove: false,
            move:false
        }
    },
    //移动动画效果
    methods: {
        moveTo(start, end, dom, prop) {
            let dis = 0;
            let speed = 5;
            this.timeOutMove = true;
            if (end < 0) {
                speed *= -1;
            }
            let timer = setInterval(() => {
                dis += speed;
                dom[prop] = start + dis;
                if (Math.abs(dis) >= Math.abs(end)) {
                    dom[prop] = start + end;
                    clearInterval(timer);
                    this.timeOutMove = false;
                }
            }, 2);
        },
    },
}