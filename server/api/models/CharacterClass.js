import mongoose from 'mongoose';

const characterClassSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: String,
});

export default mongoose.model('CharacterClass', characterClassSchema);
