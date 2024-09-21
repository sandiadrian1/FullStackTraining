using TechnicalTest.Models.DTO;
public class ItemDto
{
    //objek yang digunakan untuk mengirimkan data antara client dan server,dto digunakan untuk menampung data yang dikirimkan oleh frontend 
    public string Nama { get; set; } 
    public decimal Harga { get; set; } 
    public int Stok { get; set; } 
    public string Kategori { get; set; } 
    public IFormFile UrlGambar { get; set; } 
}
