export class Tag {

    constructor(menu, text, x, y, size, color, align, clickable) {
        this.menu = menu;
        this.size = size;
        this.text = text;
        this.width = 0;
        this.height = size;
        this.x = x;
        this.y = y;
        this.color = color;
        this.align = align;
        this.clickable = clickable == true ? clickable : false;
    }

    draw() {
        this.menu.ctx.textAlign = this.align;
        this.menu.ctx.fillStyle = this.color;
        this.menu.ctx.font = `italic ${this.size}px Arial`;
        this.width = Number.parseInt(this.menu.ctx.measureText(this.text).width);

        this.menu.ctx.shadowColor = '#111';
        this.menu.ctx.shadowBlur = 10;
        this.menu.ctx.shadowOffsetX = 2;
        this.menu.ctx.shadowOffsetY = 4;
        this.menu.ctx.fillText(this.text, this.x, this.y);
        this.menu.ctx.shadowBlur = 0;
        this.menu.ctx.shadowOffsetX = 0;
        this.menu.ctx.shadowOffsetY = 0;
    }

}