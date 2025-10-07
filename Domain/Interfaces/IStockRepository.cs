using Domain.Entities;

namespace Domain.Interfaces
{
	public interface IStockRepository 
	{
		Task<Stock> GetStock(Guid stockId, CancellationToken cancellationToken = default);

		Task<ICollection<Stock>> GetStocks(CancellationToken cancellationToken = default);
	}
}
