import seeder from 'mongoose-seed';
import keys from '../api/config/keys';
import data from './data.json';

seeder.connect(keys.MONGODB_URL, () => {
  seeder.loadModels([
    'server/api/models/Background',
    'server/api/models/Race',
    'server/api/models/CharacterClass',
  ]);

  seeder.clearModels(['Background', 'Race', 'CharacterClass'], () => {
    seeder.populateModels(data, () => {
      seeder.disconnect();
    });
  });
});
