using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using TechnicalTest.Models.DTO;

[Route("api/[controller]")]
[ApiController]
/*[Authorize]*/
public class TransactionController : ControllerBase
{
    private readonly TransactionService _transactionService;

    public TransactionController(TransactionService transactionService)
    {
        _transactionService = transactionService;
    }

    // Endpoint untuk memproses transaksi (POS)
    [HttpPost("transactions")]
    public async Task<IActionResult> ProcessTransaction([FromBody] TransactionRequest request)
    {
        try
        {
            var transaction = await _transactionService.ProcessTransaction(request);
            return Ok(transaction);
        }
        catch (Exception ex)
        {
            return BadRequest(new { message = ex.Message });
        }
    }

    // Endpoint untuk mendapatkan semua transaksi (laporan POS)
    [HttpGet("transactions")]
    public async Task<IActionResult> GetTransactions()
    {
        var transactions = await _transactionService.GetAllTransactions();
        return Ok(transactions);
    }
}
