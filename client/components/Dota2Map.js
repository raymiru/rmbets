/*
Thanks to Hawkbets.com for this map
 */

const size = 0.8;

export class Dota2Map
{

  constructor(canvasElement)
  {
    this.ctx = canvasElement.getContext(`2d`);
    this.redColor = '#ff4132';
    this.greenColor = '#6bc43c';
    this.buildingState = null;
  }

  changeState(buildingState)
  {
    if (this.buildingState === null) {
      this.buildingState = buildingState;

      this.draw();
    } else if (JSON.stringify(this.buildingState) !== JSON.stringify(buildingState)) {
      let prevBuildingState = this.buildingState,
        i = 0;

      const interval = setInterval(() => {
        if (i % 2 === 0) this.buildingState = prevBuildingState;
        else this.buildingState = buildingState;

        this.draw();

        if (i === 21) clearInterval(interval);

        i++;
      }, 300);
    }
  }

  draw()
  {
    this.ctx.clearRect(0, 0, 220*size, 220*size);
    this.ctx.strokeStyle = 'black';

    //mid line
    this.ctx.beginPath();
    this.ctx.moveTo(65*size, 155*size);
    this.ctx.lineTo(155*size, 65*size);
    this.ctx.lineWidth = 2;
    this.ctx.stroke();

    //top line
    this.ctx.beginPath();
    this.ctx.moveTo(20*size, 140*size);
    this.ctx.lineTo(20*size, 20*size);
    this.ctx.lineTo(140*size, 20*size);
    this.ctx.stroke();

    //bot line
    this.ctx.beginPath();
    this.ctx.moveTo(80*size, 200*size);
    this.ctx.lineTo(200*size, 200*size);
    this.ctx.lineTo(200*size, 80*size);
    this.ctx.stroke();

    //radiant top towers
    this.drawTower(this.buildingState.team1.top[0], 20*size, 60*size,  this.greenColor);
    this.drawTower(this.buildingState.team1.top[1], 20*size, 100*size, this.greenColor);
    this.drawTower(this.buildingState.team1.top[2], 20*size, 150*size, this.greenColor);

    //radiant mid towers
    this.drawTower(this.buildingState.team1.mid[0], 95*size, 125*size, this.greenColor);
    this.drawTower(this.buildingState.team1.mid[1], 75*size, 145*size, this.greenColor);
    this.drawTower(this.buildingState.team1.mid[2], 58*size, 162*size, this.greenColor);

    //radiant bot towers
    this.drawTower(this.buildingState.team1.bot[0], 160*size, 200*size, this.greenColor);
    this.drawTower(this.buildingState.team1.bot[1], 120*size, 200*size, this.greenColor);
    this.drawTower(this.buildingState.team1.bot[2], 70*size,  200*size, this.greenColor);

    //radiant top barracks
    this.drawBarrack(this.buildingState.team1.top[3],7*size ,157*size,  this.greenColor);
    this.drawBarrack(this.buildingState.team1.top[4],23*size ,157*size, this.greenColor);

    //radiant mid barracks
    this.drawBarrack(this.buildingState.team1.mid[3],40*size ,157*size, this.greenColor);
    this.drawBarrack(this.buildingState.team1.mid[4],53*size ,170*size, this.greenColor);

    //radiant bot barracks
    this.drawBarrack(this.buildingState.team1.bot[3],53*size ,187*size, this.greenColor);
    this.drawBarrack(this.buildingState.team1.bot[4],53*size ,203*size, this.greenColor);

    //radiant t4
    this.drawT4(this.buildingState.team1.t4[0], 20*size, 190*size, this.greenColor);
    this.drawT4(this.buildingState.team1.t4[1], 30*size, 200*size, this.greenColor);

    //dire top towers
    this.drawTower(this.buildingState.team2.top[0], 60*size,  20*size, this.redColor);
    this.drawTower(this.buildingState.team2.top[1], 100*size, 20*size, this.redColor);
    this.drawTower(this.buildingState.team2.top[2], 150*size, 20*size, this.redColor);

    //dire mid towers
    this.drawTower(this.buildingState.team2.mid[0], 125*size, 95*size, this.redColor);
    this.drawTower(this.buildingState.team2.mid[1], 145*size, 75*size, this.redColor);
    this.drawTower(this.buildingState.team2.mid[2], 162*size, 58*size, this.redColor);

    //dire bot towers
    this.drawTower(this.buildingState.team2.bot[0], 200*size, 160*size, this.redColor);
    this.drawTower(this.buildingState.team2.bot[1], 200*size, 120*size, this.redColor);
    this.drawTower(this.buildingState.team2.bot[2], 200*size, 70*size,  this.redColor);

    //dire top barracks
    this.drawBarrack(this.buildingState.team2.top[3],157*size ,7*size,  this.redColor);
    this.drawBarrack(this.buildingState.team2.top[4],157*size ,23*size, this.redColor);

    //dire mid barracks
    this.drawBarrack(this.buildingState.team2.mid[3],157*size ,40*size, this.redColor);
    this.drawBarrack(this.buildingState.team2.mid[4],170*size ,53*size, this.redColor);

    //dire bot barracks
    this.drawBarrack(this.buildingState.team2.bot[3],187*size ,53*size, this.redColor);
    this.drawBarrack(this.buildingState.team2.bot[4],203*size ,53*size, this.redColor);

    //dire t4
    this.drawT4(this.buildingState.team2.t4[0], 190*size, 20*size, this.redColor);
    this.drawT4(this.buildingState.team2.t4[1], 200*size, 30*size, this.redColor);
  }

  drawTower(state, x, y, color)
  {
    this.ctx.fillStyle = state === '1' ? color : 'white';
    this.ctx.beginPath();
    this.ctx.arc(x, y, 4, 0, 2 * Math.PI);
    this.ctx.fill();
    this.ctx.lineWidth = 2;
    this.ctx.strokeStyle = 'black';
    this.ctx.stroke();
  }

  drawBarrack(state, x, y, color)
  {
    this.ctx.fillStyle = state === '1' ? color : 'white';
    this.ctx.beginPath();
    this.ctx.fillRect(x, y, 10*size, 10*size);
  }

  drawT4(state,x,y,color)
  {
    this.ctx.fillStyle = state === '1' ? color : 'white';
    this.ctx.beginPath();
    this.ctx.arc(x, y, 5, 0, 2 * Math.PI);
    this.ctx.fill();
  }
}
