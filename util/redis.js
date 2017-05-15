/**
 * Created by v_lljunli on 2017/5/15.
 */
var settings = require('./settings');
var redis   = require('redis');

// redis 链接
var client  = redis.createClient(settings.REDIS_PORT, settings.REDIS_HOST);

// redis 链接错误
client.on("error", function(error) {
  console.log(error);
});

// redis 验证 (reids.conf未开启验证，此项可不需要)
client.auth(settings.REDIS_PSD);

module.exports = client;