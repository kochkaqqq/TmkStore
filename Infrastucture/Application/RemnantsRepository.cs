using Domain.Entities;
using Domain.Exceptions;
using Domain.Interfaces;
using Infrastucture.DataBase;
using Microsoft.EntityFrameworkCore;

namespace Infrastucture.Application
{
	public class RemnantsRepository : IRemnantsRepository
	{
		private readonly IDbContext _dbContext;

		public RemnantsRepository(IDbContext dbContext)
		{
			_dbContext = dbContext;
		}

		public async Task<Remnants> GetRemnants(string nomenclatureId, Guid stockId)
		{
			return await _dbContext.Remnants.FirstOrDefaultAsync(r => r.NomenclatureId == nomenclatureId && r.StockId == stockId)
				?? throw new NotFound();
		}
	}
}
