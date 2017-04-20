import * as mongoose from 'mongoose';
const Schema = mongoose.Schema;

const PostSchema = new Schema({
    posts: String,
    createBy: { type: Schema.Types.ObjectId, ref: 'User' },
    isLike: Boolean,
    createTime: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.model('Post', PostSchema);