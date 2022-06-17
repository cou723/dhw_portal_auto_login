import OptionsSync from 'webext-options-sync';

export default new OptionsSync({
  defaults: {
    userName: '',
    password: '',
  },
  migrations: [
    OptionsSync.migrations.removeUnused,
  ],
  logging: true,
});
