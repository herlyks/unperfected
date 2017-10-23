var template_options_dot_js = 'template_options.js is loaded..';

var deal_damage_option = function(option) {
  return {
    deal_damage : {
      caster : {
        value : option.caster.name,
        class : option.caster == player ? 'playername' : 'enemyname'
      },
      target : {
        value : option.target.name,
        class : option.target == player ? 'playername' : 'enemyname'
      },
      skill : {
        value : option.name,
        class : 'skillname'
      },
      damage : {
        value : option.critical ? false : option.damage,
        critical : option.critical ? option.damage : false,
        class : option.critical ? 'damagecritical' : 'damagetext'
      }
    }
  };
};

var restore_hp_option = function(option) {
  return {
    restore_hp : {
      caster : {
        value : option.caster.name,
        class : option.caster == player ? 'playername' : 'enemyname'
      },
      target : {
        value : option.target.name,
        class : option.target == player ? 'playername' : 'enemyname'
      },
      skill : {
        value : option.name,
        class : 'skillname'
      },
      restore : {
        value : option.final ? false : option.restore,
        final : option.final ? option.restore : false,
        class : option.final ? 'damagefinal' : 'damagetext'
      }
    }
  };
};
