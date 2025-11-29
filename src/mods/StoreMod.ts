import type { WASocket } from '@whiskeysockets/baileys';
import { LexzyLogger } from '../utils/logger.js';

export interface Product {
    id: string;
    name: string;
    price: number;
    description: string;
    image?: string;
    stock: number;
}

export interface Order {
    id: string;
    customerJid: string;
    products: Product[];
    total: number;
    status: 'pending' | 'paid' | 'shipped' | 'delivered';
}

export class StoreMod {
    private products: Map<string, Product> = new Map();
    private orders: Map<string, Order> = new Map();

    constructor(private sock: WASocket) {
        this.initializeSampleProducts();
    }

    private initializeSampleProducts() {
        const sampleProducts: Product[] = [
            {
                id: '1',
                name: '🔥 LEXZYMARKET T-SHIRT',
                price: 99000,
                description: 'Premium quality t-shirt dengan logo Lexzymarket',
                stock: 50
            },
            {
                id: '2', 
                name: '💻 PROGRAMMING COURSE',
                price: 299000,
                description: 'Full course programming dari basic sampai expert',
                stock: 100
            },
            {
                id: '3',
                name: '📱 WHATSAPP BOT SCRIPT',
                price: 149000,
                description: 'Complete WhatsApp bot script siap pakai',
                stock: 25
            }
        ];

        sampleProducts.forEach(product => {
            this.products.set(product.id, product);
        });
    }

    /**
     * 🔥 Tampilkan catalog products
     */
    async showCatalog(jid: string) {
        const products = Array.from(this.products.values());
        
        let catalogText = `🛒 *LEXZYMARKET CATALOG*\n\n`;
        
        products.forEach((product, index) => {
            catalogText += `*${index + 1}. ${product.name}*\n`;
            catalogText += `💰 Price: Rp ${product.price.toLocaleString()}\n`;
            catalogText += `📦 Stock: ${product.stock}\n`;
            catalogText += `📝 ${product.description}\n`;
            catalogText += `🆔 Code: ${product.id}\n\n`;
        });

        catalogText += `💬 *Cara Order:*\n`;
        catalogText += `Ketik: !order <product_id> <quantity>\n`;
        catalogText += `Contoh: !order 1 2`;

        await this.sock.sendMessage(jid, { text: catalogText });
    }

    /**
     * 🔥 Buat order baru
     */
    async createOrder(jid: string, productId: string, quantity: number = 1) {
        const product = this.products.get(productId);
        if (!product) {
            return { success: false, message: '❌ Product tidak ditemukan' };
        }

        if (product.stock < quantity) {
            return { success: false, message: '❌ Stock tidak mencukupi' };
        }

        const orderId = `ORD${Date.now()}`;
        const order: Order = {
            id: orderId,
            customerJid: jid,
            products: [product],
            total: product.price * quantity,
            status: 'pending'
        };

        this.orders.set(orderId, order);
        product.stock -= quantity;

        // Kirim invoice ke customer
        const invoiceText = `📦 *ORDER CONFIRMATION*\n\n` +
            `🆔 Order ID: ${orderId}\n` +
            `📦 Product: ${product.name}\n` +
            `🔢 Quantity: ${quantity}\n` +
            `💰 Total: Rp ${order.total.toLocaleString()}\n` +
            `📞 Contact Admin: t.me/Lexzymarket\n\n` +
            `✅ Order berhasil dibuat!`;

        await this.sock.sendMessage(jid, { text: invoiceText });

        LexzyLogger.success(`New order created: ${orderId} for ${jid}`);
        
        return {
            success: true,
            message: '✅ Order berhasil dibuat',
            data: order
        };
    }

    /**
     * 🔥 Cek status order
     */
    async checkOrder(jid: string, orderId: string) {
        const order = this.orders.get(orderId);
        if (!order) {
            return { success: false, message: '❌ Order tidak ditemukan' };
        }

        const statusText = `📋 *ORDER STATUS*\n\n` +
            `🆔 Order ID: ${order.id}\n` +
            `📦 Status: ${order.status.toUpperCase()}\n` +
            `💰 Total: Rp ${order.total.toLocaleString()}\n` +
            `📞 Admin: t.me/Lexzymarket`;

        await this.sock.sendMessage(jid, { text: statusText });

        return { success: true, data: order };
    }
}