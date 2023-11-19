const XLSX = require('xlsx');

const leerExcel = (ruta) => {
    const workbook = XLSX.readFile(ruta);
    const [sheet] = workbook.SheetNames;
    const dataExcel = XLSX.utils.sheet_to_json(workbook.Sheets[sheet]);

    const obtenerValoresColumna = (datosExcel) => {
        let suma = 0;
        let contador = 0;

        datosExcel.forEach(({ Numero }) => {
            console.log(Numero);
            suma += Numero;
            contador++;
        });

        const promedio = suma / contador;
        console.log(`El promedio es: ${promedio.toFixed(2)}`);
    };

    obtenerValoresColumna(dataExcel);
};

leerExcel('datos_ejemplo.xlsx');
