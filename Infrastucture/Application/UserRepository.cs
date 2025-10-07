using Domain.Entities;
using Domain.Exceptions;
using Domain.Interfaces;
using Infrastucture.DataBase;
using Microsoft.EntityFrameworkCore;

namespace Infrastucture.Application
{
	public class UserRepository : IUserRepository
	{
		private readonly IDbContext _dbContext;

		public UserRepository(IDbContext dbContext)
		{
			_dbContext = dbContext;
		}

		public async Task<User> GetUser(int userId)
		{
			return await _dbContext.Users.FirstOrDefaultAsync(u => u.UserId == userId) ?? throw new NotFound();
		}
	}
}
