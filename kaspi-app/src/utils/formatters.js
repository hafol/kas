/**
 * Утилиты форматирования для приложения Kaspi.kz
 * Обеспечивают свободу действий пользователя при вводе сумм:
 * - Если введены целые числа (например, 100000 или 100 000), они форматируются с пробелами: "100 000"
 * - НИКАКИХ принудительных ",00" в конце, если пользователь их не вводил или удалил!
 * - Если пользователь ввёл копейки (например, 110 922,58 или 50 000,5), они точно сохраняются.
 * - При удалении копеек сумма остаётся без них ("110 922").
 */

export function parseAndFormatKaspiBalance(input) {
  if (input === null || input === undefined) return '110 922,58';

  let str = String(input).trim();
  // Убираем завершающий символ тенге ₸, если он присутствует
  str = str.replace(/\s*₸\s*$/, '').trim();
  if (!str) return '0';

  // Удаляем внутренние пробелы для анализа структуры числа
  const compact = str.replace(/\s+/g, '');
  const match = compact.match(/^([+-]?\d+)(?:([.,])(\d*))?$/);

  if (match) {
    const intPart = match[1];
    const sep = match[2];
    const decPart = match[3];

    // Форматируем разряды тысяч пробелами (100000 -> 100 000)
    const formattedInt = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');

    if (sep !== undefined && decPart !== undefined && decPart.length > 0) {
      // Пользователь явно указал копейки (например, ,58 или ,5 или ,00) -> сохраняем с запятой
      return `${formattedInt},${decPart}`;
    } else {
      // Пользователь НЕ вводил копейки или удалил их -> НИКАКИХ ",00"!
      return formattedInt;
    }
  }

  // Свобода действий: если строка нестандартная, возвращаем как есть
  return str;
}

export function formatBalanceWithCurrency(val) {
  const formatted = parseAndFormatKaspiBalance(val);
  return `${formatted} ₸`;
}
