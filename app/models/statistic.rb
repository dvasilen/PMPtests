class Statistic < ActiveRecord::Base
	belongs_to :users
	
	def total
		correct + incorrect + noanswer
	end
	
	def score
		correct / total * 100
	end
end
