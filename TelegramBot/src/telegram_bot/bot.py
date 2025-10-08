import asyncio
import logging
import os
from aiogram import Bot, Dispatcher
from aiogram.filters import Command
from aiogram.types import Message, WebAppInfo
from aiogram.types import InlineKeyboardMarkup, InlineKeyboardButton
from dotenv import load_dotenv

load_dotenv()

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

BOT_TOKEN = os.getenv("BOT_TOKEN", "")
WEB_APP_URL = os.getenv("WEB_APP_URL", "https://your-app-url.com")

bot = Bot(token=BOT_TOKEN)
dp = Dispatcher()


@dp.message(Command("start"))
async def cmd_start(message: Message):
    """Обработка команды /start"""

    welcome_text = """🏭 Добро пожаловать в ТМК E-commerce!

Интернет-магазин трубной продукции от ведущего производителя — Трубной Металлургической Компании.

✅ Что мы предлагаем:
• Широкий ассортимент труб и металлопродукции
• Актуальные цены и остатки на складах
• Удобный поиск по параметрам
• Быстрое оформление заказов

🔍 Нажмите "Открыть магазин" для начала работы

По вопросам:
📞 +7 (800) 234-50-05
📧 sales@tmk-group.com"""

    # Создание клавиатуры с кнопкой Web App
    keyboard = InlineKeyboardMarkup(
        inline_keyboard=[
            [
                InlineKeyboardButton(
                    text="🛒 Открыть магазин", web_app=WebAppInfo(url=WEB_APP_URL)
                )
            ],
        ]
    )

    await message.answer(text=welcome_text, reply_markup=keyboard)


# Главная функция запуска бота
async def main():
    logger.info("Starting TMK E-commerce Bot...")
    try:
        await bot.delete_webhook(drop_pending_updates=True)
        await dp.start_polling(bot)
    except Exception as e:
        logger.error(f"Error: {e}")
    finally:
        await bot.session.close()


def run():
    asyncio.run(main())
