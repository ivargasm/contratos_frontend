/**
 * Utilidad para convertir números a letras en español
 * y formatear cantidades monetarias
 */

/**
 * Convierte un número a su representación en palabras en español
 * @param numero - El número a convertir a letras
 * @returns La representación en palabras del número
 */
export const numeroALetras = (numero: number): string => {
    if (isNaN(numero) || numero === 0) return 'Cero';

    const unidades = ['', 'Un', 'Dos', 'Tres', 'Cuatro', 'Cinco', 'Seis', 'Siete', 'Ocho', 'Nueve'];
    const especiales = ['', 'Once', 'Doce', 'Trece', 'Catorce', 'Quince', 'Dieciséis', 'Diecisiete', 'Dieciocho', 'Diecinueve'];
    const decenas = ['', 'Diez', 'Veinte', 'Treinta', 'Cuarenta', 'Cincuenta', 'Sesenta', 'Setenta', 'Ochenta', 'Noventa'];
    const centenas = ['', 'Ciento', 'Doscientos', 'Trescientos', 'Cuatrocientos', 'Quinientos', 'Seiscientos', 'Setecientos', 'Ochocientos', 'Novecientos'];

    // Función auxiliar para convertir números menores a mil
    const convertirMenorMil = (num: number): string => {
        let resultado = '';

        // Centenas
        const centena = Math.floor(num / 100);
        if (centena > 0) {
            if (num === 100) {
                return 'Cien';
            } else {
                resultado += centenas[centena];
                num %= 100;
                if (num > 0) resultado += ' ';
            }
        }

        // Decenas y unidades
        if (num <= 0) {
            return resultado;
        } else if (num < 10) {
            resultado += unidades[num];
        } else if (num < 20) {
            resultado += especiales[num - 10];
        } else {
            const decena = Math.floor(num / 10);
            const unidad = num % 10;

            if (unidad === 0) {
                resultado += decenas[decena];
            } else if (decena === 2) {
                resultado += 'Veinti' + unidades[unidad].toLowerCase();
            } else {
                resultado += decenas[decena] + ' y ' + unidades[unidad].toLowerCase();
            }
        }

        return resultado;
    };

    // Obtener parte entera
    let entero = Math.floor(numero);
    let resultado = '';

    // Convertir billones
    const billones = Math.floor(entero / 1000000000000);
    if (billones > 0) {
        if (billones === 1) {
            resultado += 'Un billón ';
        } else {
            resultado += convertirMenorMil(billones) + ' billones ';
        }
        entero %= 1000000000000;
    }

    // Convertir millones
    const millones = Math.floor(entero / 1000000);
    if (millones > 0) {
        if (millones === 1) {
            resultado += 'Un millón ';
        } else {
            resultado += convertirMenorMil(millones) + ' millones ';
        }
        entero %= 1000000;
    }

    // Convertir miles
    const miles = Math.floor(entero / 1000);
    if (miles > 0) {
        if (miles === 1) {
            resultado += 'Mil ';
        } else {
            resultado += convertirMenorMil(miles) + ' mil ';
        }
        entero %= 1000;
    }

    // Convertir centenas, decenas y unidades
    if (entero > 0) {
        resultado += convertirMenorMil(entero);
    }

    // Si no hay nada, es cero
    if (resultado === '') {
        resultado = 'Cero';
    }

    return resultado.trim();
};

/**
 * Tipo de moneda soportado
 */
export type TipoMoneda = 'MXN' | 'DLS' | 'EUR' | string;

/**
 * Convierte un valor numérico a su representación en letras con formato monetario
 * @param valor - El valor numérico a convertir
 * @param moneda - El tipo de moneda (MXN, DLS, EUR)
 * @returns La representación en letras con formato monetario
 */
export const formatearValorEnLetras = (valor: string | number, moneda: TipoMoneda): string => {
    if (!valor || isNaN(parseFloat(valor.toString()))) return '';

    // Separar parte entera y decimal
    const partes = valor.toString().split('.');
    const decimal = partes.length > 1 ? partes[1].padEnd(2, '0').substring(0, 2) : '00';

    // Convertir a letras
    const letras = numeroALetras(parseFloat(partes[0]));

    // Determinar denominación según moneda
    let denominacion = '';
    switch (moneda) {
        case 'MXN':
            denominacion = `pesos ${decimal}/100 M.N.`;
            break;
        case 'DLS':
            denominacion = `dólares ${decimal}/100 USD`;
            break;
        case 'EUR':
            denominacion = `euros ${decimal}/100 EUR`;
            break;
        default:
            denominacion = `pesos ${decimal}/100 M.N.`;
    }

    return `${letras} ${denominacion}`;
};