class StatisticsController < ApplicationController
  def save
	newStat = User.find(current_user).statistics.create
	newStat.correct = params[:correct]
	newStat.incorrect = params[:incorrect]
	newStat.noanswer = params[:noanswer]
	newStat.time = params[:time]
	newStat.save
	render nothing: true
	
  end

  def get
	totaltime = User.find(current_user).statistics.map{|x| x.time}.sum
	totalcorrect = User.find(current_user).statistics.map{|x| x.correct}.sum
	totalincorrect = User.find(current_user).statistics.map{|x| x.incorrect}.sum
	totalnoanswer = User.find(current_user).statistics.map{|x| x.noanswer}.sum
	totalquest = User.find(current_user).statistics.map{|x| x.total}.sum
  end

  def purge
  end
end
