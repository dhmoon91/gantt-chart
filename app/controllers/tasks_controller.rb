class TasksController < ApplicationController
  def index
    @tasks = Task.all
  end
  def create
    @task = Task.new(task_params)

    if @task.save
      render json: @task
    else
      render json @task.erros, status: 'unprocessable_entity'
    end
  end
  def update
    @task = Task.find(params[:id])
    if @task.update(task_params)
      render json: @task
    else
      render json @task.erros, status: 'unprocessable_entity'
    end
    # @task.update_attributes(task_params)
  end
  def destroy
    @task = Task.find(params[:id])
    @task.destroy
    head :no_content
  end
  private
  def task_params
    params.require(:task).permit(:id, :title, :position, :startDate, :endDate)
  end
end
