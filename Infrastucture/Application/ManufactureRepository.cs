using Domain.Entities;
using Domain.Interfaces;
using Infrastucture.DataBase;
using Microsoft.EntityFrameworkCore;

namespace Infrastucture.Application
{
	public class ManufactureRepository : IManufatureRepository
	{
		private readonly IDbContext _dbContext;

		public ManufactureRepository(IDbContext dbContext)
		{
			_dbContext = dbContext;
		}

		public async Task<ICollection<Manufacturer>> GetManufacturers(CancellationToken cancellationToken)
		{
			return await _dbContext.Manufacturers.AsNoTracking().ToArrayAsync(cancellationToken);
		}
	}
}
