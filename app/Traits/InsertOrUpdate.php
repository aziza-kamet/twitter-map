<?php

namespace App\Traits;

trait InsertOrUpdate
{

    /**
     *  Custom function to mass insert
     *  or update on duplicate
     *  (source: https://gist.github.com/RuGa/5354e44883c7651fd15c)
     *
     * @param array $rows
     * @return bool
     */
    public static function insertOrUpdate(array $rows)
    {
        $table = \DB::getTablePrefix().with(new self)->getTable();


        $first = reset($rows);

        $columns = implode(
            ',',
            array_map(
                function ($value) {
                    return "$value";
                },
                array_keys($first)
            )
        );

        $values = implode(',', array_map(function ($row) {
            return '('.implode(',', array_map(function ($value) {
                    return '"'.str_replace('"', '""', $value).'"';
            }, $row)).')';
        }, $rows));

        $updates = implode(',', array_map(function ($value) {
            return "$value = VALUES($value)";
        }, array_keys($first)));

        $sql = "INSERT INTO {$table}({$columns}) VALUES {$values} ON DUPLICATE KEY UPDATE {$updates}";

        return \DB::statement($sql);
    }
}
