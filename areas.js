export const recoveryArea = {
    x: 100,
    y: 100,
    radius: 80,
    color: 'green',
    active: true
  };
  
  export const artifactArea = {
    x: 300,
    y: 300,
    radius: 50,
    color: 'purple',
    active: true,
    resource: 3
  };
  
  export const labArea = {
    x: 400,
    y: 100,
    radius: 80,
    color: 'red',
    active: true
  };
  
  export function drawArea(ctx, area) {
    if (area.active) {
      ctx.beginPath();
      ctx.arc(area.x, area.y, area.radius, 0, Math.PI * 2);
      ctx.fillStyle = area.color;
      ctx.fill();
      ctx.closePath();
    }
  }
  