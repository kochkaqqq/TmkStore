using Domain.Entities;
using Domain.Enums;
using Domain.Exceptions;
using Domain.Interfaces;
using Infrastucture.DataBase;
using Microsoft.EntityFrameworkCore;

namespace Infrastucture.Application
{
	public class PriceRepository : IPriceRepository
	{
		private readonly IDbContext _dbContext;

		public PriceRepository(IDbContext dbContext)
		{
			_dbContext = dbContext;
		}

		public async Task<decimal> CountAmount(string nomenclatureId, Guid stockId, decimal quantity, ScaleType scale)
		{
			var price = await GetPrice(nomenclatureId, stockId);

			if (scale == ScaleType.Tones)
			{
				if (quantity < price.PriceLimitT1)
					return quantity * price.PriceT;
				if (quantity < price.PriceLimitT2)
					return quantity * price.PriceT1;
				return quantity * price.PriceT2;
			}
			else
			{
				if (quantity < price.PriceLimitM1)
					return quantity * price.PriceM;
				if (quantity < price.PriceLimitM2)
					return quantity * price.PriceM1;
				return quantity * price.PriceM2;
			}	
		}

		public async Task<Price> GetPrice(string nomenclatureId, Guid stockId)
		{
			var price = await _dbContext.Prices
				.AsNoTracking()
				.FirstOrDefaultAsync(p => p.NomenclatureId == nomenclatureId && p.StockId == stockId);

			if (price == null)
				throw new NotFound();

			return price;
		}
	}
}
