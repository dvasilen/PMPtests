class Statistic < ActiveRecord::Base
	belongs_to :users
	
	def total
		correct + incorrect + noanswer
	end
	
	def score
		100 * correct / total
	end
end
