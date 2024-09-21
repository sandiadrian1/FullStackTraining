using Microsoft.EntityFrameworkCore;
using TechnicalTest.Data; 
using TechnicalTest.Models;
using TechnicalTest.Models.DTO;

public class TransactionService
{
    private readonly AppDbContext _context;
    public TransactionService(AppDbContext context)
    {
        _context = context;
    }

    public async Task<TransaksiItem> ProcessTransaction(TransactionRequest request)
    {
        var item = await _context.Items.FindAsync(request.ItemId);
        if (item == null)
        {
            throw new Exception("Item tidak ditemukan");
        }

        if (item.Stok < request.Quantity)
        {
            throw new Exception("Stok tidak mencukupi");
        }

        var totalPrice = item.Harga * request.Quantity;
        item.Stok -= request.Quantity;

        var transaction = new TransaksiItem
        {
            ItemId = request.ItemId,
            Kuantitas = request.Quantity,
            TotalHarga = totalPrice,
            TanggalTransaksi = DateTime.Now
        };

        _context.TransaksiItems.Add(transaction);
        await _context.SaveChangesAsync();

        return transaction;
    }

    public async Task<List<TransaksiItem>> GetAllTransactions()
    {
        return await _context.TransaksiItems.Include(t => t.Item).ToListAsync();
    }
}
