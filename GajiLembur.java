import java.util.Scanner;

public class GajiLembur {

    public static double hitungGajiLembur(String tipeKaryawan, int jamLembur) {
        double upahPerJam = 0;

        switch (tipeKaryawan) {
            case "Staf":
                return 0;
            case "karyawan tetap":
                upahPerJam = 30000;
                break;
            case "karyawan yayasan":
                upahPerJam = 20000;
                break;
            case "Karyawan training":
                upahPerJam = 15000;
                break;
            default:
                System.out.println("Tipe karyawan tidak valid");
                return -1;
        }

        double gajiLembur;
        if (jamLembur <= 2) {
            gajiLembur = jamLembur * upahPerJam;
        } else if (jamLembur <= 5) {
            gajiLembur = (2 * upahPerJam) + ((jamLembur - 2) * 2 * upahPerJam);
        } else {
            gajiLembur = (2 * upahPerJam) + (3 * 2 * upahPerJam) + ((jamLembur - 5) * 3 * upahPerJam);
        }

        return gajiLembur;
    }

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        System.out.println("Masukkan Tipe Karyawan:");
        System.out.println("a) Karyawan training");
        System.out.println("b) karyawan yayasan");
        System.out.println("c) karyawan tetap");
        System.out.println("d) Staf");
        System.out.print("Pilihan (a/b/c/d): ");
        String pilihan = scanner.next().trim().toLowerCase();

        String tipeKaryawan;
        switch (pilihan) {
            case "a":
                tipeKaryawan = "Karyawan training";
                break;
            case "b":
                tipeKaryawan = "karyawan yayasan";
                break;
            case "c":
                tipeKaryawan = "karyawan tetap";
                break;
            case "d":
                tipeKaryawan = "Staf";
                break;
            default:
                System.out.println("Pilihan tidak valid");
                scanner.close();
                return;
        }

        System.out.print("Masukkan Jumlah Jam Lembur: ");
        int jamLembur;
        try {
            jamLembur = scanner.nextInt();
        } catch (Exception e) {
            System.out.println("Jumlah jam lembur harus berupa angka");
            scanner.close();
            return;
        }

        double gajiLembur = hitungGajiLembur(tipeKaryawan, jamLembur);
        if (gajiLembur != -1) {
            System.out.println("Gaji lembur: " + gajiLembur);
        }

        scanner.close();
    }
}