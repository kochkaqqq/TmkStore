using Domain.Entities;
using Domain.Exceptions;
using Domain.Interfaces;
using Infrastucture.DataBase;
using Microsoft.EntityFrameworkCore;

namespace Infrastucture.Application
{
	public class StockRepository : IStockRepository
	{
		private readonly IDbContext _dbContext;

		public StockRepository(IDbContext dbContext)
		{
			_dbContext = dbContext;
		}

		public async Task<Stock> GetStock(Guid stockId, CancellationToken cancellationToken = default)
		{
			return await _dbContext.Stocks.FirstOrDefaultAsync(s => s.StockId == stockId)
				?? throw new NotFound();
		}

		public async Task<ICollection<Stock>> GetStocks(CancellationToken cancellationToken = default)
		{
			return await _dbContext.Stocks.AsNoTracking().ToListAsync(cancellationToken);
		}
	}
}
