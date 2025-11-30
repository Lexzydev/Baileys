const { LexzyClient } = require('./core/LexzyClient');
const { ChannelMod } = require('./mods/ChannelMod');
const { StoreMod } = require('./mods/StoreMod');
const { AutoReplyMod } = require('./mods/AutoReplyMod');
const { WebToolsMod } = require('./mods/WebToolsMod');
const { MediaMod } = require('./mods/MediaMod');
const { SchedulerMod } = require('./mods/SchedulerMod');
const { LexzyLogger } = require('./utils/logger');

const Baileys = require('@whiskeysockets/baileys');
const chalk = require('chalk');
const moment = require('moment');

module.exports = {
  // Core
  LexzyClient,
  
  // Mods
  ChannelMod,
  StoreMod,
  AutoReplyMod,
  WebToolsMod,
  MediaMod,
  SchedulerMod,
  
  // Utils
  LexzyLogger,
  
  // Dependencies re-export
  chalk,
  moment,
  
  // Baileys re-exports
  makeWASocket: Baileys.makeWASocket,
  useMultiFileAuthState: Baileys.useMultiFileAuthState,
  DisconnectReason: Baileys.DisconnectReason,
  Browsers: Baileys.Browsers
};