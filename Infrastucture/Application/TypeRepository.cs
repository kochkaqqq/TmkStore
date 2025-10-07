using Domain.Interfaces;
using Infrastucture.DataBase;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;

namespace Infrastucture.Application
{
	public class TypeRepository : ITypeRepository
	{
		private readonly IDbContext _dbContext;

		public TypeRepository(IDbContext dbContext)
		{
			_dbContext = dbContext;
		}

		public async Task<ICollection<Domain.Entities.Type>> GetAllTypes(CancellationToken cancellationToken)
		{
			return await _dbContext.Types.AsNoTracking().ToArrayAsync(cancellationToken);
		}

		public Task<Domain.Entities.Type> GetType(Guid typeId, CancellationToken cancellationToken)
		{
			throw new NotImplementedException();
		}
	}
}
