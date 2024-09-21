namespace TechnicalTest.Models
{
    public class TransaksiItem
    {
        public int Id { get; set; }
        public int ItemId { get; set; }
        public Item Item { get; set; }
        public int Kuantitas { get; set; }
        public decimal TotalHarga { get; set; }
        public DateTime TanggalTransaksi { get; set; }
    }
}
