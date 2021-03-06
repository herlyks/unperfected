if (typeof actor_dot_js === 'undefined') {
  throw new Error('actor.js is missing..');
}
if (typeof db_skill === 'undefined') {
  throw new Error('db_skill.js is missing..');
}
if (typeof global_dot_js === 'undefined') {
  throw new Error('global.js is missing..');
}
if (typeof template_options_dot_js === 'undefined') {
  throw new Error('template_options.js is missing..');
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
    var index = $(this).prop('id').slice('skill'.length);
    var skill = player.skill[index];
    if (typeof skill === 'undefined') {
      skill = {};
    }

    $(this).popover({
      title: skill.name || 'undefined',
      content: skill.description || 'undefined',
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

      switch (index) {
        case '0':
          skill.castTo(enemy);
          break;
        case '1':
          skill.castTo(enemy);
          break;
        case '2':
          skill.castTo(enemy);
          break;
        case '3':
          skill.castTo(enemy);
          break;
        case '4':
          skill.castTo(enemy);
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

  $('#small_modal').modal({
    show : false,
    backdrop : 'static',
    keyboard : 'false'
  });

  $('#btn_small_modal').click(function() {
    $('#small_modal').modal('show');
  });

});

function update() {
  player.hp > player.max_hp ? player.hp = player.max_hp: '';
  player.hp < 0 ? player.hp = 0 : '';
  player.mp > player.max_mp ? player.mp = player.max_mp : '';
  player.mp < 0 ? player.mp = 0 : '';
  // player.fd > player.max_fd ? player.fd = player.max_fd : '';
  // player.fd < 0 ? player.fd = 0 : '';

  enemy.hp > enemy.max_hp ? enemy.hp = enemy.max_hp : '';
  enemy.hp < 0 ? enemy.hp = 0 : '';
  enemy.mp > enemy.max_mp ? enemy.mp = enemy.max_mp : '';
  enemy.mp < 0 ? enemy.mp = 0 : '';
  // enemy.fd > enemy.max_fd ? enemy.fd = enemy.max_fd : '';
  // enemy.fd < 0 ? enemy.fd = 0 : '';

  if (player.hp == 0) {
    if (battle_over == false) {
      battle_over = true;
      writeBattleLog('Battle is over..');
      writeBattleLog(enemy.name + ' win..');
    }
  } else if(enemy.hp == 0) {
    if (battle_over == false) {
      battle_over = true;
      writeBattleLog('Battle is over..');
      writeBattleLog(player.name + ' win..');
      player.gainExp(enemy.getExpDrop(), function() {
        var template = Mustache.render(getTemplate('levelup_modal_template'), {
          level : player.level
        });
        $('body').append(template);
        $('#levelup_modal').modal({
          show : true,
          backdrop : 'static',
          keyboard : 'false'
        });
        $('#levelup_modal button').click(function() {
          $('#levelup_modal_'+player.level).modal('hide');
          $('#levelup_modal_'+player.level).on('hidden.bs.modal', function() {
            $('#levelup_modal_'+player.level).remove();
          });
        });
      });
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
      if (typeof actor[k] !== 'function' && typeof actor[k] !== 'object') {
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
  $('#debug').empty();
  var playerxp = player.getExp();
  var requiredxp = player.getExpNextLevel();
  var previousxp = player.getExpNextLevel(player.level - 1);
  player.level == 1 ? previousxp = 0 : '';
  var percentxp = Math.floor(((playerxp - previousxp) / (requiredxp - previousxp) * 100) * 100) / 100;
  $('#debug').append('levelup progress: ' + playerxp + '/' + requiredxp + ' (' + percentxp + '%)');
}
