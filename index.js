var player = new Actor('Player 1');
var enemy = new Actor('Enemy', {
  max_hp: dice(50, 200),
  max_mp: dice(50, 200),
  max_fd: dice(10, 100)
});

var player_hpbar;
var player_hpbar_value;
var player_hp_percent;
var player_mpbar;
var player_mpbar_value;
var player_mp_percent;
var player_fdbar;
var player_fdbar_value;
var player_fd_percent;
var enemy_hpbar;
var enemy_hpbar_value;
var enemy_hp_percent;
var enemy_mpbar;
var enemy_mpbar_value;
var enemy_mp_percent;
var enemy_fdbar;
var enemy_fdbar_value;
var enemy_fd_percent;
var battle_log;

$(document).ready(function() {
  player_hpbar = $('#player_hpbar');
  player_hpbar_value = $('#player_hpbar_value');
  player_mpbar = $('#player_mpbar');
  player_mpbar_value = $('#player_mpbar_value');
  player_fdbar = $('#player_fdbar');
  player_fdbar_value = $('#player_fdbar_value');
  enemy_hpbar = $('#enemy_hpbar');
  enemy_hpbar_value = $('#enemy_hpbar_value');
  enemy_mpbar = $('#enemy_mpbar');
  enemy_mpbar_value = $('#enemy_mpbar_value');
  enemy_fdbar = $('#enemy_fdbar');
  enemy_fdbar_value = $('#enemy_fdbar_value');
  battle_log = $('#battle_log');

  setInterval(render, 100);

  $('.btn-skill').each(function() {
    $(this).popover({
      title: $(this).prop('id'),
      content: 'WASD',
      placement: 'auto',
      trigger: 'hover'
    });

    $(this).click(function() {
      if ($(this).hasClass('disabled')) {
        return;
      }

      switch ($(this).prop('id')) {
        case 'skill0':
          basicAttack(enemy);
          break;
        case 'skill1':
          skillOne(enemy);
          break;
        case 'skill2':
          skillTwo(enemy);
          break;
        case 'skill3':
          skillThree(enemy);
          break;
        case 'skill4':
          skillUltimate(enemy);
          break;
        default:
          break;
      }

      $(this).addClass('disabled');
      setTimeout(() => $(this).removeClass('disabled'), 1000);
    });
  });

  battle_log.scrollTop(battle_log[0].scrollHeight);
  enemy.hp = dice(0, enemy.max_hp);
  enemy.mp = dice(0, enemy.max_mp);
  enemy.fd = dice(0, enemy.max_fd);

  $('#new_enemy').click(function() {
    enemy = new Actor('Enemy', {
      max_hp: dice(50, 200),
      max_mp: dice(50, 200),
      max_fd: dice(10, 100)
    });
    enemy.hp = dice(0, enemy.max_hp);
    enemy.mp = dice(0, enemy.max_mp);
    enemy.fd = dice(0, enemy.max_fd);
    battle_log.empty();
    writeBattleLog('New Enemy spawned..');
  });

});

function update() {
  player.hp > player.max_hp ? player.hp = player.max_hp: '';
  player.hp < 0 ? player.hp = 0 : '';
  player.mp > player.max_mp ? player.mp = player.max_mp : '';
  player.mp < 0 ? player.mp = 0 : '';
  player.fd > player.max_fd ? player.fd = player.max_fd : '';
  player.fd < 0 ? player.fd = 0 : '';

  enemy.hp > enemy.max_hp ? enemy.hp = enemy.max_hp : '';
  enemy.hp < 0 ? enemy.hp = 0 : '';
  enemy.mp > enemy.max_mp ? enemy.mp = enemy.max_mp : '';
  enemy.mp < 0 ? enemy.mp = 0 : '';
  enemy.fd > enemy.max_fd ? enemy.fd = enemy.max_fd : '';
  enemy.fd < 0 ? enemy.fd = 0 : '';

  player_hp_percent = Math.floor((player.hp / player.max_hp * 100) * 100) / 100;
  player_mp_percent = Math.floor((player.mp / player.max_mp * 100) * 100) / 100;
  player_fd_percent = Math.floor((player.fd / player.max_fd * 100) * 100) / 100;

  enemy_hp_percent = Math.floor((enemy.hp / enemy.max_hp * 100) * 100) / 100;
  enemy_mp_percent = Math.floor((enemy.mp / enemy.max_mp * 100) * 100) / 100;
  enemy_fd_percent = Math.floor((enemy.fd / enemy.max_fd * 100) * 100) / 100;
}

function render() {
  update();

  player_hpbar.css('width', player_hp_percent + '%');
  player_mpbar.css('width', player_mp_percent + '%');
  player_fdbar.css('width', player_fd_percent + '%');

  enemy_hpbar.css('width', enemy_hp_percent + '%');
  enemy_mpbar.css('width', enemy_mp_percent + '%');
  enemy_fdbar.css('width', enemy_fd_percent + '%');

  if ($('#percent_display').prop('checked')) {
    player_hpbar_value.prop('innerHTML', player_hp_percent + '%');
    player_mpbar_value.prop('innerHTML', player_mp_percent + '%');
    player_fdbar_value.prop('innerHTML', player_fd_percent + '%');

    enemy_hpbar_value.prop('innerHTML', enemy_hp_percent + '%');
    enemy_mpbar_value.prop('innerHTML', enemy_mp_percent + '%');
    enemy_fdbar_value.prop('innerHTML', enemy_fd_percent + '%');
  } else {
    player_hpbar_value.prop('innerHTML', Math.floor(player.hp) + '/' + player.max_hp);
    player_mpbar_value.prop('innerHTML', Math.floor(player.mp) + '/' + player.max_mp);
    player_fdbar_value.prop('innerHTML', Math.floor(player.fd) + '/' + player.max_fd);

    enemy_hpbar_value.prop('innerHTML', Math.floor(enemy.hp) + '/' + enemy.max_hp);
    enemy_mpbar_value.prop('innerHTML', Math.floor(enemy.mp) + '/' + enemy.max_mp);
    enemy_fdbar_value.prop('innerHTML', Math.floor(enemy.fd) + '/' + enemy.max_fd);
  }
}

function dice(min = 1, max = 6) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function writeBattleLog(msg) {
  var date = new Date();
  var time = addZero(date.getHours().toString(), 2) + ':' + addZero(date.getMinutes().toString(), 2) + ':' + addZero(date.getSeconds().toString(), 2);
  battle_log.append('<br>' + time + ' | ' + msg);
  battle_log.scrollTop(battle_log[0].scrollHeight);
}

function addZero(str, digit = 2) {
  return str.length < digit ? '0' + str : str;
}

function basicAttack(target) {
  target.hp -= 10;
}

function skillOne(target) {
  target.hp -= 10 + (0.05 * (target.max_hp - target.hp));
}

function skillTwo(target) {
  target.hp += 20;
}

function skillThree() {

}

function skillUltimate() {

}
