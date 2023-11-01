class Estudiante {
    private int cuenta;
    private String nombre;
    private String materia;
    private int calificacion;

    public Estudiante(int cuenta, String nombre) {
        this.cuenta = cuenta;
        this.nombre = nombre;
        this.materia = "";
        this.calificacion = -1; // Valor por defecto para indicar que aún no se ha establecido una calificación
    }

    public void matricular(String materia) {
        this.materia = materia;
    }

    public void setCalificacion(int calificacion) {
        this.calificacion = calificacion;
    }

    public String getObservacion() {
        if (calificacion >= 65) {
            return "Aprobado";
        } else {
            return "Reprobado";
        }
    }

    public int getCuenta() {
        return cuenta;
    }

    public String getNombre() {
        return nombre;
    }

    public String getMateria() {
        return materia;
    }

    public int getCalificacion() {
        return calificacion;
    }
}

public class PruebaEstudiante {
    public static void main(String[] args) {
        // Crear un estudiante
        Estudiante estudiante1 = new Estudiante(12345, "Juan Pérez");

        // Matricular al estudiante en una materia
        estudiante1.matricular("Matemáticas");

        // Establecer la calificación del estudiante
        estudiante1.setCalificacion(75);

        // Mostrar información del estudiante y su observación
        System.out.println("Información del Estudiante:");
        System.out.println("Cuenta: " + estudiante1.getCuenta());
        System.out.println("Nombre: " + estudiante1.getNombre());
        System.out.println("Materia: " + estudiante1.getMateria());
        System.out.println("Calificación: " + estudiante1.getCalificacion());
        System.out.println("Observación: " + estudiante1.getObservacion());
    }
}
