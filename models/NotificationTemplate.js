import mongoose from 'mongoose';

const notificationTemplateSchema = new mongoose.Schema({
    name: String,
    type: { type: String, enum: ['email', 'push', 'in-app'], default: 'email' },
    subject: String,
    content: String,
    active: { type: Boolean, default: true },
    lastUsed: Date,
}, { timestamps: true });

export default mongoose.model('NotificationTemplate', notificationTemplateSchema);