# bracket-lib
## 1、官网
官网地址：https://bfnightly.bracketproductions.com/rustbook

官网示例：https://bfnightly.bracketproductions.com/bracket-lib/what_is_it.html

## 2、安装
`Cargo.toml`
```json
[dependencies]
bracket-lib = "~0.8"
```

## 3、基本使用
### 3.1、prelude
#### 3.1.1、创建一个画布
```js
use bracket_lib::prelude::*;

struct State {}

impl GameState for State {
    fn tick(&mut self, ctx: &mut BTerm) {
        ctx.cls();
        ctx.print(1, 1, "hello bracket!!!");
    }
}

fn main() -> BError {
    let context = BTermBuilder::simple80x50()
        .with_title("Flappy Dragon")
        .build()?;
    main_loop(context, State{})
}
```

#### 3.1.2、监听键盘事件
```js
use bracket_lib::prelude::*;

struct State {}

impl GameState for State {
  fn tick(&mut self, ctx: &mut BTerm) {
      match ctx.key {
        Some(key) => println!("keycode: {:?}", key),
        _ => {},
      }
  }
}

fn main() -> BError {
    let context = BTermBuilder::simple80x50().with_title("title").build()?;
    main_loop(context, State{})
}
```  

#### 3.1.3、自定义窗口大小
```js
let context = BTermBuilder::vga(100, 50).with_title("title").build()?;
```

#### 3.1.4、画盒子
```js
ctx.draw_box(39, 0, 20, 3, RGB::named(WHITE), RGB::named(BLACK));
ctx.printer(
    58,
    1,
    &format!("#[pink]FPS: #[]{}", ctx.fps),
    TextAlign::Right,
    None,
);
ctx.printer(
    58,
    2,
    &format!("#[pink]Frame Time: #[]{} ms", ctx.frame_time_ms),
    TextAlign::Right,
    None,
);
```

### 3.2、random模块
#### 3.2.1、RandomNumberGenerator生成随机数
:::tip
RandomNumberGenerator::new()使用的是随机种子
:::
```js
use bracket_lib::random::RandomNumberGenerator;

fn main() {
    let mut random = RandomNumberGenerator::new();
    println!("Hello, world!=={}", random.range(0, 10));
}
```

#### 3.2.2、指定类型的随机数
```js
use bracket_lib::random::RandomNumberGenerator;

fn main() {
    let mut random = RandomNumberGenerator::new();
    let res:f32 = random.rand();
    println!("Hello, world!=={}", res);
}
```

### 3.3、color
#### 3.3.1、lerp文字颜色渐变
```js
let col1 = RGB::named(CYAN);
let col2 = RGB::named(YELLOW);
let percent = self.y as f32 / 50.0;
let fg = col1.lerp(col2, percent);

ctx.print_color(
    1, 
    self.y, 
    fg, 
    RGB::named(BLACK), 
    "♫ ♪ Hello Bracket World ☺",
);
```

```js
impl GameState for State {
  fn tick(&mut self, ctx: &mut BTerm) {
      let red = RGB::named(RED);
      let blue = RGB::named(YELLOW);
      for i in 1..80 {
          let percent = i as f32 / 80.0;
          let color = red.lerp(blue, percent);
          ctx.print_color(
              1, 
              i, 
              color, 
              RGB::named(BLACK), 
              "♫ ♪ Hello Bracket World ☺",
          );
      }
  }
}
```

#### 3.3.2、lerpit迭代器渐变颜色
```js
impl GameState for State {
  fn tick(&mut self, ctx: &mut BTerm) {
    let mut i = 0;
    for color in RgbLerp::new(RGB::named(RED), RGB::named(YELLOW), 20) {
        ctx.print_color(
            1, 
            i, 
            color, 
            RGB::named(BLACK), 
            "♫ ♪ Hello Bracket World ☺",
        );
        i += 1;
    }
  }
}
```

#### 3.3.3、颜色渐变
```js

```

## 5、示例
### 5.1、飞行的龙
```js
use bracket_lib::prelude::*;

enum GameMode {
    Menu,
    Playing,
    End,
}

const SCREEN_WIDTH:i32 = 80;
const SCREEN_HEIGHT:i32 = 50;
const FRAME_DURATION:f32 = 60.0;

struct Player {
    x: i32,
    y: i32,
    velocity: f32, // 速度
}

impl Player {
    fn new(x: i32, y: i32) -> Self {
        Player { x, y, velocity: 0.0 }
    }

    fn render(&mut self, ctx: &mut BTerm) {
        ctx.set(0, self.y, YELLOW, BLACK, to_cp437('@'))
    }

    fn gravity_and_mode(&mut self) {
        if self.velocity < 2.0 {
            self.velocity += 0.2; 
        }
        self.y += self.velocity as i32;
        self.x += 1;
        if self.y < 0 {
            self.y = 0;
        } 
    }

    fn flap(&mut self) {
        self.velocity = -2.0;
    }
}

struct Obstacle {
    x: i32,
    gap_y: i32, // 障碍物y坐标
    size: i32, // 障碍物大小
}

impl Obstacle {
    fn new(x: i32, score: i32) -> Self {
        let mut random = RandomNumberGenerator::new();
        Obstacle {
            x,
            gap_y: random.range(10, 40),
            size: i32::max(2, 20 - score),
        }
    }

    fn render(&mut self, ctx: &mut BTerm, player_x: i32) {
        // 画障碍物在屏幕中的位置
        let screen_x = self.x - player_x;
        let half_size = self.size / 2;

        for y in 0..self.gap_y - half_size {
            ctx.set(screen_x, y, RED, BLACK, to_cp437('|'));
        }
        
        for y in self.gap_y + half_size..SCREEN_HEIGHT {
            ctx.set(screen_x, y, RED, BLACK, to_cp437('|'));
        }
    }

    fn hit_obstacle(&self, player: &Player) -> bool {
        let half_size = self.size / 2;
        let does_x_match = player.x == self.x;
        let player_above_gap = player.y < self.gap_y - half_size;
        let player_below_gap = player.y > self.gap_y + half_size;
        does_x_match && (player_above_gap || player_below_gap)
    }
}

struct State {
    mode: GameMode,
    player: Player,
    frame_time: f32, // 游戏刷新时间
    obstacle: Obstacle,
    score: i32, // 分数
}

impl State {
    fn new() -> Self {
        State { 
            mode: GameMode::Menu,
            player: Player::new(5, 25),
            frame_time: 0.0,
            obstacle: Obstacle::new(SCREEN_WIDTH, 0),
            score: 0
        }
    }

    fn restart(&mut self) {
        self.mode = GameMode::Playing;
        self.player = Player::new(5, 25);
        self.frame_time = 0.0;
        // 重新初始化障碍物
        self.obstacle = Obstacle::new(SCREEN_WIDTH, 0);
        self.score = 0;
    }

    fn main_menu(&mut self, ctx: &mut BTerm) {
        ctx.cls();
        ctx.print_centered(5, "Welcome to Flappy Dragon");
        ctx.print_centered(8, "(P) Play Game");
        ctx.print_centered(9, "(Q) Quit Game");

        // 监听按键
        if let Some(key) = ctx.key {
          match key {
              VirtualKeyCode::P => self.restart(),
              VirtualKeyCode::Q => ctx.quitting = true,
              _ => {}
          }
      }
    }

    fn play(&mut self, ctx: &mut BTerm) {
        ctx.cls_bg(NAVY);
        self.frame_time += ctx.frame_time_ms;
        if self.frame_time > FRAME_DURATION {
            self.frame_time = 0.0;
            self.player.gravity_and_mode();
        }
        
        // 监听按键
        if let Some(VirtualKeyCode::Space) = ctx.key {
            self.player.flap();
        }

        // 渲染
        self.player.render(ctx);
        ctx.print(0, 0, "Press SPACE to flap.");
        ctx.print(0, 1, &format!("Score: {}", self.score));

        self.obstacle.render(ctx, self.player.x);
        // 得分
        if self.player.x > self.obstacle.x {
            self.score += 1;
            self.obstacle = Obstacle::new(self.player.x + SCREEN_WIDTH, self.score);
        }

        // 接收条件
        if self.player.y > SCREEN_HEIGHT || self.obstacle.hit_obstacle(&self.player) {
            self.mode = GameMode::End;
        }
    }

    fn dead(&mut self, ctx: &mut BTerm) {
        ctx.cls();
        ctx.print_centered(5, "Game Over!");
        ctx.print_centered(6, &format!("Your score: {}", self.score));
        ctx.print_centered(8, "(P) Play Again");
        ctx.print_centered(9, "(Q) Quit Game");
        
        // 监听按键
        if let Some(key) = ctx.key {
          match key {
              VirtualKeyCode::P => self.restart(),
              VirtualKeyCode::Q => ctx.quitting = true,
              _ => {}
          }
        }
    }
}

impl GameState for State {
    fn tick(&mut self, ctx: &mut BTerm) {
        match self.mode {
            GameMode::Menu => self.main_menu(ctx),
            GameMode::Playing => self.play(ctx),
            GameMode::End => self.dead(ctx),
        }
    }
}

fn main() -> BError {
    let context = BTermBuilder::simple80x50()
        .with_title("Flappy Dragon")
        .build()?;
    main_loop(context, State::new())
}
```
### 5.2、 