// lib/validation.ts

type FormData = Record<string, string | undefined>

/**
 * Valida que los campos requeridos estén completos.
 * 
 * @param form Objeto con los datos del formulario
 * @param camposRequeridos Lista de nombres de campos requeridos
 * @returns Un arreglo con los nombres de campos faltantes
 */
export function validarCamposObligatorios(form: FormData, camposRequeridos: string[]): string[] {
    return camposRequeridos.filter((campo) => {
        const valor = form[campo]
        return !valor || valor.toString().trim() === ""
    })
}
