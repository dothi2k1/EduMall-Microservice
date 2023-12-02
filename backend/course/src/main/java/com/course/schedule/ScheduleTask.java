package com.course.schedule;


import com.course.model.Course;


import java.util.List;

public class ScheduleTask extends Thread{

    private String name;
    private List<Course> list;


    @Override
    public void run() {
        try {
            Thread.sleep(1000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        System.out.println("Process "+name);
    }
}
