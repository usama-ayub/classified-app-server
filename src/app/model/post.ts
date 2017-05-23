import * as mongoose from 'mongoose';
import User from '../../app/model/user'
const Schema = mongoose.Schema;

const PostSchema = new Schema({
    title: String,
    description: String,
    imgName: String,
    category: String,
    feature: Boolean,
    createBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    price: Number,
    isLike: Boolean,
    createTime: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.model('Post', PostSchema);