import mongoose from 'mongoose';

const backgroundSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: String,
});

export default mongoose.model('Background', backgroundSchema);
