if (typeof actor_dot_js === 'undefined') {
  throw new Error('actor.js is missing..');
}
if (typeof global_dot_js === 'undefined') {
  throw new Error('global.js is missing..');
}
if (typeof main_dot_js === 'undefined') {
  throw new Error('main.js is missing..');
}

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

  templates = loadTemplateFile();

  setInterval(render, 33);

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

      if (battle_over == true) {
        return;
      }

      switch ($(this).prop('id')) {
        case 'skill0':
          player.basicAttack(enemy);
          break;
        case 'skill1':
          player.skillOne(enemy);
          break;
        case 'skill2':
          player.skillTwo(enemy);
          break;
        case 'skill3':
          player.skillThree(enemy);
          break;
        case 'skill4':
          player.skillUltimate(enemy);
          break;
        default:
          break;
      }

      $(this).addClass('disabled');
      setTimeout(() => $(this).removeClass('disabled'), 1000);
    });
  });

  battle_log.scrollTop(battle_log[0].scrollHeight);

  $('#new_enemy').click(function() {
    spawnEnemy();
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

  if (player.hp == 0 || enemy.hp == 0) {
    if (battle_over == false) {
      battle_over = true;
      writeBattleLog('Battle is over..');
    }
  }

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

  debug();
}

function debug() {
  var template_stat = getTemplate('stat_template');
  $('#actor_stat').empty();
  for (var i = 0; i < [enemy, player].length; i++) {
    var actor = [enemy, player][i];
    var el = '<div class="col-md-6">';
    for (var k in actor) {
      if (typeof actor[k] !== 'function') {
        var elm = Mustache.render(template_stat, {
          stat_key: k,
          stat_value: actor[k]
        })
        el += elm;
      }
    }
    el += '</div>';
    $('#actor_stat').append(el);
  }
}
