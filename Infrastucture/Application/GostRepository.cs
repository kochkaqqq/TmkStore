using Domain.Entities;
using Domain.Interfaces;
using Infrastucture.DataBase;
using Microsoft.EntityFrameworkCore;

namespace Infrastucture.Application
{
	public class GostRepository : IGostRepository
	{
		private readonly IDbContext _dbContext;

		public GostRepository(IDbContext dbContext)
		{
			_dbContext = dbContext;
		}

		public async Task<ICollection<Gost>> GetGosts(CancellationToken cancellationToken)
		{
			return await _dbContext.Gosts.AsNoTracking().ToArrayAsync(cancellationToken);
		}
	}
}
