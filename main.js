var main_dot_js = 'main.js is loaded..';
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

(function() {
  player.setSkill(0, db_skill.strike);
  player.setSkill(1, db_skill.doubleStrike);
  player.setSkill(2, db_skill.heal);
})();
